myip="$(dig +short myip.opendns.com @resolver1.opendns.com)"

# Get the security group
sg="$(aws ec2 describe-security-groups   --filters Name=tag:project,Values=tutorial-cluster | jq '.SecurityGroups[].GroupId')"

# https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#SecurityGroup:group-id=${sg}

# Add port 22 to the Security Group of the VPC
aws ec2 authorize-security-group-ingress \
        --group-id $sg \
        --protocol tcp \
        --port 22 \
        --cidr "$myip/32" | jq '.'