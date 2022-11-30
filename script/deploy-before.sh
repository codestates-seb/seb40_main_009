#!/bin/bash
if [ -d /home/ec2-user/build ]; then
    sudo rm -rf /home/ec2-user/build/
fi
sudo mkdir -vp /home/ec2-user/build/
