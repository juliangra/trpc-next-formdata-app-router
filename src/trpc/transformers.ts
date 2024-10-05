/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataTransformer {
  serialize: (object: any) => any;
  deserialize: (object: any) => any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class FormDataTransformer implements DataTransformer {
  serialize(object: any) {
    return object as FormData;
  }

  deserialize(object: any) {
    return object as JSON;
  }
}
