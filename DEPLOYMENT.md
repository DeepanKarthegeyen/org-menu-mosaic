
# Multi-Build Module Federation Deployment Guide

## Architecture Overview

This application uses a multi-build Module Federation architecture where each module can be built and deployed independently for optimal scaling and isolation.

## Project Structure

```
src/
├── modules/
│   ├── employee-app/         # Employee Management Module
│   ├── analytics-app/        # HR Analytics Module
│   ├── vehicle-app/          # Vehicle Production Module
│   ├── design-app/           # Design Studio Module
│   ├── machine-app/          # Machine Operations Module
│   └── safety-app/           # Safety Systems Module
├── config/
│   └── environmentConfig.ts  # Environment-based URL configuration
└── host/                     # Host application files
```

## Build Commands

### Individual Module Builds
```bash
# Build specific modules
npm run build:employee    # Employee Management
npm run build:analytics   # HR Analytics
npm run build:vehicle     # Vehicle Production
npm run build:design      # Design Studio
npm run build:machine     # Machine Operations
npm run build:safety      # Safety Systems

# Build host application
npm run build:host

# Build all modules
npm run build:all
```

### Development Servers
```bash
# Run individual modules in development
npm run dev:employee      # Port 3001
npm run dev:analytics     # Port 3002
npm run dev:vehicle       # Port 3003
npm run dev:design        # Port 3004
npm run dev:machine       # Port 3005
npm run dev:safety        # Port 3006

# Run host application
npm run dev               # Port 8080
```

## Environment Configuration

### Development (.env.local)
```bash
VITE_EMPLOYEE_APP_URL=http://localhost:3001
VITE_ANALYTICS_APP_URL=http://localhost:3002
VITE_VEHICLE_APP_URL=http://localhost:3003
VITE_DESIGN_APP_URL=http://localhost:3004
VITE_MACHINE_APP_URL=http://localhost:3005
VITE_SAFETY_APP_URL=http://localhost:3006
```

### Production (.env.production)
```bash
VITE_EMPLOYEE_APP_URL=https://employee-app.yourdomain.com
VITE_ANALYTICS_APP_URL=https://analytics-app.yourdomain.com
VITE_VEHICLE_APP_URL=https://vehicle-app.yourdomain.com
VITE_DESIGN_APP_URL=https://design-app.yourdomain.com
VITE_MACHINE_APP_URL=https://machine-app.yourdomain.com
VITE_SAFETY_APP_URL=https://safety-app.yourdomain.com
```

## AWS Deployment Strategy

### 1. S3 + CloudFront Setup (Per Module)
```bash
# Create S3 buckets for each module
aws s3 mb s3://employee-app-bucket
aws s3 mb s3://analytics-app-bucket
aws s3 mb s3://vehicle-app-bucket
# ... repeat for each module

# Create CloudFront distributions
aws cloudfront create-distribution --distribution-config file://employee-app-distribution.json
# ... repeat for each module
```

### 2. Build and Deploy Pipeline
```yaml
# GitHub Actions example (.github/workflows/deploy-employee.yml)
name: Deploy Employee Module
on:
  push:
    paths:
      - 'src/modules/employee-app/**'
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build employee module
        run: npm run build:employee
      - name: Deploy to S3
        run: aws s3 sync dist/employee-app s3://employee-app-bucket --delete
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

### 3. Auto Scaling Configuration
```yaml
# AWS Application Load Balancer for dynamic scaling
Resources:
  EmployeeAppTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: employee-app-targets
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPC
      HealthCheckPath: /health
      
  EmployeeAppService:
    Type: AWS::ECS::Service
    Properties:
      Cluster: !Ref ECSCluster
      TaskDefinition: !Ref EmployeeAppTaskDefinition
      DesiredCount: 2
      LaunchType: FARGATE
      LoadBalancers:
        - ContainerName: employee-app
          ContainerPort: 80
          TargetGroupArn: !Ref EmployeeAppTargetGroup
```

## Azure Deployment Strategy

### 1. Static Web Apps (Per Module)
```bash
# Create Static Web Apps for each module
az staticwebapp create \
  --name employee-app \
  --resource-group myResourceGroup \
  --source https://github.com/user/repo \
  --branch main \
  --app-location "dist/employee-app" \
  --api-location "" \
  --output-location ""
```

### 2. Container Instances for Scaling
```yaml
# Azure Container Instances for dynamic modules
apiVersion: 2018-10-01
location: eastus
name: employee-app-container
properties:
  containers:
  - name: employee-app
    properties:
      image: myregistry.azurecr.io/employee-app:latest
      resources:
        requests:
          cpu: 1
          memoryInGb: 1.5
      ports:
      - port: 80
  osType: Linux
  restartPolicy: Always
  ipAddress:
    type: Public
    ports:
    - protocol: tcp
      port: 80
```

## Scaling Strategies

### 1. Demand-Based Scaling
- **Employee Module**: Scale during payroll processing periods
- **Analytics Module**: Scale during monthly reporting
- **Vehicle Production**: Scale during peak manufacturing hours
- **Design Studio**: Scale during design review sessions
- **Machine Operations**: Scale during maintenance windows
- **Safety Systems**: Maintain consistent availability

### 2. Geographic Distribution
```bash
# Deploy modules to different regions based on usage
EMPLOYEE_APP_REGIONS=["us-east-1", "eu-west-1", "ap-southeast-1"]
ANALYTICS_APP_REGIONS=["us-east-1", "eu-west-1"]
VEHICLE_APP_REGIONS=["us-east-1", "eu-central-1"]
```

### 3. Cost Optimization
- Use spot instances for non-critical modules
- Implement auto-shutdown for development environments
- Use reserved instances for predictable workloads
- Monitor and optimize resource usage per module

## Monitoring and Health Checks

### 1. Module Health Endpoints
```typescript
// Add to each module
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    module: 'employee-app',
    version: process.env.MODULE_VERSION,
    timestamp: new Date().toISOString()
  });
});
```

### 2. Centralized Monitoring
```yaml
# CloudWatch/Application Insights configuration
Metrics:
  - ModuleAvailability
  - ResponseTime
  - ErrorRate
  - ResourceUtilization
  - ConcurrentConnections
```

## Troubleshooting

### Common Issues
1. **Module Loading Failures**: Check remote URLs and CORS settings
2. **Build Errors**: Verify module dependencies and shared libraries
3. **Deployment Issues**: Check environment variables and access permissions
4. **Scaling Problems**: Monitor resource limits and auto-scaling policies

### Debug Commands
```bash
# Check module build outputs
ls -la dist/*/
# Verify remote entry files
curl -I https://employee-app.yourdomain.com/assets/remoteEntry.js
# Test module health
curl https://employee-app.yourdomain.com/health
```

This architecture provides complete isolation, independent scaling, and cost-effective deployment for each micro-frontend module.
