#!/bin/bash
KEY_PAIR=tutorial-cluster
    ecs-cli up \
      --keypair $KEY_PAIR  \
      --capability-iam \
      --size 1 \
      --instance-type t3.small \
      --tags project=tutorial-cluster,owner=gonzalomelov \
      --cluster-config tutorial \
      --ecs-profile tutorial