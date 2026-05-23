import { EC2Client } from '@aws-sdk/client-ec2'
import { S3Client } from '@aws-sdk/client-s3'
import { RDSClient } from '@aws-sdk/client-rds'
import { LambdaClient } from '@aws-sdk/client-lambda'
import { ECSClient } from '@aws-sdk/client-ecs'
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch'
import { CostExplorerClient } from '@aws-sdk/client-cost-explorer'

interface AWSSettings {
  accessKeyId: string
  secretAccessKey: string
  region: string
}

export function getEC2Client(settings: AWSSettings) {
  return new EC2Client({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getS3Client(settings: AWSSettings) {
  return new S3Client({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getRDSClient(settings: AWSSettings) {
  return new RDSClient({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getLambdaClient(settings: AWSSettings) {
  return new LambdaClient({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getECSClient(settings: AWSSettings) {
  return new ECSClient({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getCloudWatchClient(settings: AWSSettings) {
  return new CloudWatchClient({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}

export function getCEClient(settings: AWSSettings) {
  return new CostExplorerClient({ region: settings.region, credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey } })
}
