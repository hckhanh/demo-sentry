import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'

const credentials = JSON.parse(import.meta.env.GCP_SERVICE_ACCOUNT as string)

const client = new RecaptchaEnterpriseServiceClient({ credentials });
const projectPath = client.projectPath(credentials.project_id);

export async function createAssessment(token: string, expectedAction: string) {
  const [response] = await client.createAssessment(({
    assessment: {
      event: {
        token,
        expectedAction,
        siteKey: process.env.GCP_RECAPTCHA_SITE_KEY,
      },
    },
    parent: projectPath,
  }));

  return response
}
