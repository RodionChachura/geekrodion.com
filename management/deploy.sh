npm run build
aws s3 cp build s3://$BUCKET --recursive
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"