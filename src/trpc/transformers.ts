/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataTransformer {
  serialize: (object: any) => any;
  deserialize: (object: any) => any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class FormDataTransformer implements DataTransformer {
  serialize(object: any) {
    if (!(object instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return object;
  }

  deserialize(object: any) {
    return object as JSON;
  }
}
