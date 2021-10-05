import gql from "graphql-tag";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import axios from "axios";
import { getAccessToken, isLoggedIn } from "./auth";

const endpointURL = "http://localhost:9000/graphql";

// Apollo Client

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        authorization: "Bearer " + getAccessToken(),
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endpointURL })]),
  cache: new InMemoryCache(),
});

// Fetch
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers["authorization"] = "Bearer " + getAccessToken();
  }
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((error) => error.message).join("\n");
    throw new Error(message);
  }
  return responseBody.data;
}

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;
const jobQuery = gql`
  query JobQuery($jobId: ID!) {
    job(id: $jobId) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const jobsQuery = gql`
  query jobsQuery {
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

export async function createJob(input) {
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobQuery,
        variables: { id: data.job.id },
        data,
      });
    },
  });

  return job;
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
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { jobId } });

  return job;
}

export async function loadJobs() {
  const {
    data: { jobs },
  } = await client.query({ query: jobsQuery, fetchPolicy: "no-cache" });
  return jobs;
}
