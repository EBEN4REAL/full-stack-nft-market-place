curl --request POST \
  --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer TEST_API_KEY:c8e8e5b26ec01433a2ec4cf5c50609be:ab568311dfe2cabadea248d6dfaf0b73' \
  --data '
{
  "idempotencyKey": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16",
  "address": "0x011c78487966c131215aC8F245f579B0B90539a0",
  "chain": "ETH-SEPOLIA"
}
'