gatsby build
aws s3 cp public s3://$BUCKET --recursive
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
