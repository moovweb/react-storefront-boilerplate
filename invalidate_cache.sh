#!/bin/bash 

set -e
# set -x

distribution_id=${1}
surrogate_key=${2}

start=`date +%s`

response=$(aws cloudfront create-invalidation \
              --distribution-id "${distribution_id}" \
              --paths "/__moov_sk__${surrogate_key}*")

job_id=$(echo ${response} | jq -r .Invalidation.Id)
job_status=$(echo ${response} | jq -r .Invalidation.Status)
echo "Created Invalidation with id=${job_id} status=${job_status}"

echo "Waiting for Invalidation to complete..."
while [ "${job_status}" != "Completed" ]; do
  job_status=$(aws cloudfront get-invalidation \
                  --id "${job_id}" \
                  --distribution-id "${distribution_id}" \
                  --query Invalidation.Status \
                  --output text)
  sleep 5
done

echo "Done! Took $(($(date +%s)-${start})) seconds"
