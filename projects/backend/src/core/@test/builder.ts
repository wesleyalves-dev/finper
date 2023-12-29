export abstract class Builder<Value> {
  abstract build(): Promise<Value>
}
