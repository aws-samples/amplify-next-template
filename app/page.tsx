AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: An AWS Serverless Application Model template describing your function.
Resources:
  UnifiedFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: .
      Description: ''
      MemorySize: 128
      Timeout: 3
      Handler: hello.handler
      Runtime: provided.al2
      Architectures:
        - x86_64
      EphemeralStorage:
        Size: 512
      EventInvokeConfig:
        MaximumEventAgeInSeconds: 21600
        MaximumRetryAttempts: 2
      PackageType: Zip
      Policies:
        - Statement:
            - Effect: Allow
              Action:
                - logs:CreateLogGroup
              Resource: arn:aws:logs:us-east-1:731825509313:*
            - Effect: Allow
              Action:
                - logs:CreateLogStream
                - logs:PutLogEvents
              Resource:
                - arn:aws:logs:us-east-1:731825509313:log-group:/aws/lambda/UnifiedFunction:*
        - LambdaInvokePolicy:
            FunctionName: !Ref Function
      SnapStart:
        ApplyOn: None
      RuntimeManagementConfig:
        UpdateRuntimeOn: Auto
      Environment:
        Variables:
          FUNCTION_FUNCTION_NAME: !Ref Function
          FUNCTION_FUNCTION_ARN: !GetAtt Function.Arn
  DomainName:
    Type: AWS::AppSync::DomainName
    Properties:
      DomainName: <String>
      CertificateArn: <String>
  Api:
    Type: AWS::Serverless::Api
    Properties:
      Name: !Sub
        - ${ResourceName} From Stack ${AWS::StackName}
        - ResourceName: Api
      StageName: Prod
      DefinitionBody:
        openapi: '3.0'
        info: {}
        paths:
          /:
            get:
              responses: {}
      EndpointConfiguration: REGIONAL
      TracingEnabled: true
  UserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      AdminCreateUserConfig:
        AllowAdminCreateUserOnly: false
      AliasAttributes:
        - email
        - preferred_username
      UserPoolName: !Sub ${AWS::StackName}-UserPool
  UserPoolClient:
    Type: AWS::Cognito::UserPoolClient
  Table:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES
  EventRule:
    Type: AWS::Events::Rule
    Properties:
      EventPattern:
        source:
          - aws.health
  Schedule:
    Type: AWS::Scheduler::Schedule
    Properties:
      ScheduleExpression: rate(1 minute)
      FlexibleTimeWindow:
        Mode: 'OFF'
  Stream:
    Type: AWS::Kinesis::Stream
    Properties:
      StreamEncryption:
        EncryptionType: KMS
        KeyId: alias/aws/kinesis
      StreamModeDetails:
        StreamMode: ON_DEMAND
  Function:
    Type: AWS::Serverless::Function
    Properties:
      Description: !Sub
        - Stack ${AWS::StackName} Function ${ResourceName}
        - ResourceName: Function
      CodeUri: src/Function
      Runtime: provided.al2
      MemorySize: 3008
      Timeout: 30
      Tracing: Active
  FunctionLogGroup:
    Type: AWS::Logs::LogGroup
    DeletionPolicy: Retain
    Properties:
      LogGroupName: !Sub /aws/lambda/${Function}
  Layer:
    Type: AWS::Serverless::LayerVersion
    Properties:
      Description: !Sub
        - Stack ${AWS::StackName} Layer ${ResourceName}
        - ResourceName: Layer
      ContentUri: src/Layer
      RetentionPolicy: Retain
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub ${AWS::StackName}-bucket-${AWS::AccountId}
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: aws:kms
              KMSMasterKeyID: alias/aws/s3
      PublicAccessBlockConfiguration:
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
  BucketBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref Bucket
      PolicyDocument:
        Id: RequireEncryptionInTransit
        Version: '2012-10-17'
        Statement:
          - Principal: '*'
            Action: '*'
            Effect: Deny
            Resource:
              - !GetAtt Bucket.Arn
              - !Sub ${Bucket.Arn}/*
            Condition:
              Bool:
                aws:SecureTransport: 'false'
  Topic:
    Type: AWS::SNS::Topic
  Queue:
    Type: AWS::SQS::Queue
  StateMachine:
    Type: AWS::Serverless::StateMachine
    Properties:
      Definition:
        StartAt: LambdaTask
        States:
          LambdaTask:
            Type: Task
            Resource: arn:aws:states:::lambda:invoke
            Parameters:
              Payload.$: $
              FunctionName: ${LambdaFunction1}
            End: true
      Logging:
        Level: ALL
        IncludeExecutionData: true
        Destinations:
          - CloudWatchLogsLogGroup:
              LogGroupArn: !GetAtt StateMachineLogGroup.Arn
      Policies:
        - AWSXrayWriteOnlyAccess
        - Statement:
            - Effect: Allow
              Action:
                - logs:CreateLogDelivery
                - logs:GetLogDelivery
                - logs:UpdateLogDelivery
                - logs:DeleteLogDelivery
                - logs:ListLogDeliveries
                - logs:PutResourcePolicy
                - logs:DescribeResourcePolicies
                - logs:DescribeLogGroups
              Resource: '*'
      Tracing:
        Enabled: true
      Type: STANDARD
      DefinitionSubstitutions:
        LambdaFunction1: !Ref AWS::NoValue
  StateMachineLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub
        - /aws/vendedlogs/states/${AWS::StackName}-${ResourceId}-Logs
        - ResourceId: StateMachine
  Skill:
    Type: Alexa::ASK::Skill
    Properties:
      AuthenticationConfiguration:
        RefreshToken: <String>
        ClientSecret: <String>
        ClientId: <String>
      VendorId: <String>
      SkillPackage:
        S3Bucket: <String>
        S3Key: <String>
  Analyzer:
    Type: AWS::AccessAnalyzer::Analyzer
    Properties:
      Type: <String>
  Certificate:
    Type: AWS::ACMPCA::Certificate
    Properties:
      CertificateAuthorityArn: <String>
      Validity:
        Type: <String>
        Value: <Double>
      CertificateSigningRequest: <String>
      SigningAlgorithm: <String>
  CertificateAuthority:
    Type: AWS::ACMPCA::CertificateAuthority
    Properties:
      Type: <String>
      SigningAlgorithm: <String>
      Subject: {}
      KeyAlgorithm: <String>
  CertificateAuthorityActivation:
    Type: AWS::ACMPCA::CertificateAuthorityActivation
    Properties:
      CertificateAuthorityArn: <String>
      Certificate: <String>
  Permission:
    Type: AWS::ACMPCA::Permission
    Properties:
      CertificateAuthorityArn: <String>
      Actions:
        - <String>
      Principal: <String>
  Broker:
    Type: AWS::AmazonMQ::Broker
    Properties:
      EngineVersion: <String>
      HostInstanceType: <String>
      AutoMinorVersionUpgrade: <Boolean>
      Users:
        - Username: <String>
          Password: <String>
      BrokerName: <String>
      DeploymentMode: <String>
      EngineType: <String>
      PubliclyAccessible: <Boolean>
  Configuration:
    Type: AWS::AmazonMQ::Configuration
    Properties:
      EngineVersion: <String>
      EngineType: <String>
      Data: <String>
      Name: <String>
  ConfigurationAssociation:
    Type: AWS::AmazonMQ::ConfigurationAssociation
    Properties:
      Broker: <String>
      Configuration:
        Revision: <Integer>
        Id: <String>
  App:
    Type: AWS::Amplify::App
    Properties:
      Name: <String>
  Branch:
    Type: AWS::Amplify::Branch
    Properties:
      AppId: <String>
      BranchName: <String>
  Domain:
    Type: AWS::Amplify::Domain
    Properties:
      SubDomainSettings:
        - Prefix: <String>
          BranchName: <String>
      AppId: <String>
      DomainName: <String>
  Component:
    Type: AWS::AmplifyUIBuilder::Component
    Properties: {}
  Form:
    Type: AWS::AmplifyUIBuilder::Form
    Properties: {}
  Theme:
    Type: AWS::AmplifyUIBuilder::Theme
    Properties: {}
  Account:
    Type: AWS::ApiGateway::Account
    Properties: {}
  ApiKey:
    Type: AWS::ApiGateway::ApiKey
    Properties: {}
  BasePathMapping:
    Type: AWS::ApiGateway::BasePathMapping
    Properties:
      DomainName: <String>
  ClientCertificate:
    Type: AWS::ApiGateway::ClientCertificate
    Properties: {}
  Deployment:
    Type: AWS::ApiGateway::Deployment
    Properties:
      RestApiId: <String>
  DocumentationPart:
    Type: AWS::ApiGateway::DocumentationPart
    Properties:
      RestApiId: <String>
      Properties: <String>
      Location: {}
  DocumentationVersion:
    Type: AWS::ApiGateway::DocumentationVersion
    Properties:
      DocumentationVersion: <String>
      RestApiId: <String>
  DomainName2:
    Type: AWS::ApiGateway::DomainName
    Properties: {}
  GatewayResponse:
    Type: AWS::ApiGateway::GatewayResponse
    Properties:
      RestApiId: <String>
      ResponseType: <String>
  Method:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: <String>
      ResourceId: <String>
      HttpMethod: <String>
  Model:
    Type: AWS::ApiGateway::Model
    Properties:
      RestApiId: <String>
  RequestValidator:
    Type: AWS::ApiGateway::RequestValidator
    Properties:
      RestApiId: <String>
  Resource:
    Type: AWS::ApiGateway::Resource
    Properties:
      ParentId: <String>
      PathPart: <String>
      RestApiId: <String>
  Stage:
    Type: AWS::ApiGateway::Stage
    Properties:
      RestApiId: <String>
  RestApi:
    Type: AWS::ApiGateway::RestApi
    Properties: {}
  UsagePlan:
    Type: AWS::ApiGateway::UsagePlan
    Properties: {}
  UsagePlanKey:
    Type: AWS::ApiGateway::UsagePlanKey
    Properties:
      KeyType: <String>
      UsagePlanId: <String>
      KeyId: <String>
  VpcLink:
    Type: AWS::ApiGateway::VpcLink
    Properties:
      TargetArns:
        - <String>
      Name: <String>
  ApiGatewayManagedOverrides:
    Type: AWS::ApiGatewayV2::ApiGatewayManagedOverrides
    Properties:
      ApiId: <String>
  ApiMapping:
    Type: AWS::ApiGatewayV2::ApiMapping
    Properties:
      DomainName: <String>
      Stage: <String>
      ApiId: <String>
  Authorizer:
    Type: AWS::ApiGatewayV2::Authorizer
    Properties:
      AuthorizerType: <String>
      ApiId: <String>
      Name: <String>
  Deployment2:
    Type: AWS::ApiGatewayV2::Deployment
    Properties:
      ApiId: <String>
  DomainName3:
    Type: AWS::ApiGatewayV2::DomainName
    Properties:
      DomainName: <String>
  Application:
    Type: AWS::AppConfig::Application
    Properties:
      Name: <String>
  ConfigurationProfile:
    Type: AWS::AppConfig::ConfigurationProfile
    Properties:
      LocationUri: <String>
      ApplicationId: <String>
      Name: <String>
  Deployment3:
    Type: AWS::AppConfig::Deployment
    Properties:
      DeploymentStrategyId: <String>
      ConfigurationProfileId: <String>
      EnvironmentId: <String>
      ConfigurationVersion: <String>
      ApplicationId: <String>
  DeploymentStrategy:
    Type: AWS::AppConfig::DeploymentStrategy
    Properties:
      ReplicateTo: <String>
      DeploymentDurationInMinutes: <Double>
      GrowthFactor: <Double>
      Name: <String>
  Environment:
    Type: AWS::AppConfig::Environment
    Properties:
      ApplicationId: <String>
      Name: <String>
  HostedConfigurationVersion:
    Type: AWS::AppConfig::HostedConfigurationVersion
    Properties:
      ConfigurationProfileId: <String>
      ContentType: <String>
      Content: <String>
      ApplicationId: <String>
  Connector:
    Type: AWS::AppFlow::Connector
    Properties:
      ConnectorProvisioningType: <String>
      ConnectorProvisioningConfig: {}
  ConnectorProfile:
    Type: AWS::AppFlow::ConnectorProfile
    Properties:
      ConnectorProfileName: <String>
      ConnectorType: <String>
      ConnectionMode: <String>
  Flow:
    Type: AWS::AppFlow::Flow
    Properties:
      Tasks:
        - SourceFields:
            - <String>
          TaskType: <String>
      FlowName: <String>
      TriggerConfig:
        TriggerType: <String>
      DestinationFlowConfigList:
        - ConnectorType: <String>
          DestinationConnectorProperties: {}
      SourceFlowConfig:
        SourceConnectorProperties: {}
        ConnectorType: <String>
  GatewayRoute:
    Type: AWS::AppMesh::GatewayRoute
    Properties:
      MeshName: <String>
      VirtualGatewayName: <String>
      Spec: {}
  Application2:
    Type: AWS::ApplicationInsights::Application
    Properties:
      ResourceGroupName: <String>
  ScalingPolicy:
    Type: AWS::ApplicationAutoScaling::ScalingPolicy
    Properties:
      PolicyType: <String>
      PolicyName: <String>
  Mesh:
    Type: AWS::AppMesh::Mesh
    Properties: {}
  Route:
    Type: AWS::AppMesh::Route
    Properties:
      MeshName: <String>
      VirtualRouterName: <String>
      Spec: {}
  VirtualGateway:
    Type: AWS::AppMesh::VirtualGateway
    Properties:
      MeshName: <String>
      Spec:
        Listeners:
          - PortMapping:
              Port: <Integer>
              Protocol: <String>
  VirtualNode:
    Type: AWS::AppMesh::VirtualNode
    Properties:
      MeshName: <String>
      Spec: {}
  VirtualRouter:
    Type: AWS::AppMesh::VirtualRouter
    Properties:
      MeshName: <String>
      Spec:
        Listeners:
          - PortMapping:
              Port: <Integer>
              Protocol: <String>
  AutoScalingConfiguration:
    Type: AWS::AppRunner::AutoScalingConfiguration
    Properties: {}
  ObservabilityConfiguration:
    Type: AWS::AppRunner::ObservabilityConfiguration
    Properties: {}
  VpcConnector:
    Type: AWS::AppRunner::VpcConnector
    Properties:
      Subnets:
        - <String>
Metadata:
  AWS::Composer::ExternalResources:
    ExternalRDS:
      Type: externalRDS
      Settings:
        Port: !Ref ExternalRDSPort
        Hostname: !Ref ExternalRDSHostname
        SecretArn: !Ref ExternalRDSSecretArn
Parameters:
  ExternalRDSPort:
    Type: Number
  ExternalRDSHostname:
    Type: String
  ExternalRDSSecretArn:
    Type: String