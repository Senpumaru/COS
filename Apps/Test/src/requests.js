import axios from "axios";

const endpointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((error) => error.message).join("\n");
    throw new Error(message);
  }
  return responseBody.data;
}

export async function loadCompany(companyId) {
  const query = `query CompanyQuery($companyId: ID!) {
        company(id: $companyId) {
          id
          name
          description
          jobs {
            id
            title
          }
        }
      }
      `;
  const { company } = await graphqlRequest(query, { companyId });

  return company;
}

export async function loadJob(jobId) {
  const query = `query JobQuery($jobId: ID!) {
  
        job(id: $jobId) {
          id
          title
          company {
            id
            name
          }
          description
        }
      }`;
  const data = await graphqlRequest(query, { jobId });

  return data.job;
}

export async function loadJobs() {
  const query = `{
                  jobs {
                    id
                    title
                    
                    company {
                      id
                      name
                      
                    }
                  }
                }
                
              `;

  const { jobs } = await graphqlRequest(query);
  return jobs;
}
