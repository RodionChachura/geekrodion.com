yarn build
npm run deploy
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
