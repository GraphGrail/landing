#!/bin/bash
set -e  # Exit with non-zero if anything fails

MASTER_BRANCH="master"
STAGING_BRANCH="staging"


# Do not build a new version if it is a pull-request or commit not to BUILD_BRANCH
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Not $BUILD_BRANCH, skipping deploy;"
    exit 0
fi

if [ "$TRAVIS_BRANCH" != "$MASTER_BRANCH" ] && [ "$TRAVIS_BRANCH" != "$STAGING_BRANCH" ]; then
    echo "Not $MASTER_BRANCH or $STAGING_BRANCH branch but $TRAVIS_BRANCH, skipping deploy;"
    exit 0
fi

FRONTEND_HEAD_COMMIT=`git rev-parse --verify --short HEAD`
FRONTEND_REPO=`git config remote.origin.url`
BACKEND_NAME="landing_back"
BACKEND_REPO="git@github.com:graphgrail-front/landing.git"

echo "Prepare the key..."
# Encryption key is a key stored in travis itself
OUT_KEY="id_rsa"
echo "Trying to decrypt encoded key..."
openssl aes-256-cbc -k "$ENCRYPTION_KEY" -in deploy/id_rsa.enc -out $OUT_KEY -d -md sha256
chmod 600 $OUT_KEY
echo "Add decoded key to the ssh agent keystore"
eval `ssh-agent -s`
ssh-add $OUT_KEY

echo "Pull upstream backend repo"
pushd ..
git clone $BACKEND_REPO $BACKEND_NAME
echo "Return back to the original repo"
popd

if [ "$TRAVIS_BRANCH" == "$MASTER_BRANCH" ]; then
  BUILD_BRANCH=$MASTER_BRANCH
else
  BUILD_BRANCH=$STAGING_BRANCH
fi

echo "Checkout to $BUILD_BRANCH branch in backend repo"
pushd ../$BACKEND_NAME
git checkout $BUILD_BRANCH
popd

echo "Copy data to the backend repo"
echo "Copy repo files to new frontend repo"
rsync -avi --exclude=deploy --exclude=id_rsa --exclude=.git --exclude=.travis.yml --exclude=.gitignore ./ ../$BACKEND_NAME/
echo "Copying finished"

echo "Add new data to the backend repo git"
pushd ../$BACKEND_NAME
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

echo "Add new data to $BACKEND_REPO"
git add -A .
if ! [[ -z $(git status -s) ]] ; then
  echo "Pushing changes to the $BACKEND_REPO $BUILD_BRANCH branch"
  git commit -m "Add new build data from $FRONTEND_REPO frontend $FRONTEND_HEAD_COMMIT commit to $BUILD_BRANCH"
  git push origin $BUILD_BRANCH
  echo "All done."
else
  echo "There are no changes in result build, so nothing to push forward. End here."
  exit 0
fi

