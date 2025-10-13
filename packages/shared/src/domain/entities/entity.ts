export class Entity<Props> {
  private _id: string;
  protected props: Props;

  constructor(props: Props, id: string) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }
}
