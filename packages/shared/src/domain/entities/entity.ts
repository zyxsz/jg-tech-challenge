export class Entity<Props, Relations> {
  private _id: string;
  protected props: Props;
  protected _relations?: Relations;

  constructor(props: Props, id: string, relations?: Relations) {
    this._id = id;
    this.props = props;
    this._relations = relations;
  }

  public get id() {
    return this._id;
  }

  public get relations() {
    return this._relations;
  }
}
