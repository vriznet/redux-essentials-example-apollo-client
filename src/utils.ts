import { OperationVariables, TypedDocumentNode } from '@apollo/client';
import { client } from './apollo';

export const deepRemoveTypename = (payloadWithTypeName: any) => {
  return JSON.parse(
    JSON.stringify(payloadWithTypeName, (name, val) => {
      if (name === '__typename') {
        delete val[name];
      } else {
        return val;
      }
    })
  );
};

export const deepRemoveTypenameInArray = (arrayWithTypenames: any[]) => {
  const resultArray = arrayWithTypenames.map((item) =>
    deepRemoveTypename(item)
  );
  return resultArray;
};

export const apolloQueryWithDelay = async <T, O extends OperationVariables>(
  query: TypedDocumentNode<T, O>,
  delay: number
) => {
  try {
    const { data } = await client.query<T, O>({ query });
    await new Promise((resolve) => setTimeout(resolve, delay));
    return data;
  } catch (error) {
    console.error(error);
  }
};
