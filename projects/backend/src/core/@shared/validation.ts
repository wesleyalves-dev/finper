export abstract class Validation<Value> {
  abstract validate(value: Value): Promise<Value>
}
