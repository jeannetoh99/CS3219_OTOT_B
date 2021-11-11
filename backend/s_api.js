
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'jeannetoh',
  applicationName: 'cs3219-otot-b',
  appUid: '1MlB5kL4Kf8gKbXcLf',
  orgUid: '30538d87-b6e3-4587-a73c-6e4ba5b48591',
  deploymentUid: '7fe94ebf-94ba-4ee9-9ebc-085bd0473264',
  serviceName: 'cs3219-otot-b',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '5.5.1',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'cs3219-otot-b-dev-api', timeout: 6 };

try {
  const userHandler = require('./src/index.js');
  module.exports.handler = serverlessSDK.handler(userHandler.index, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}