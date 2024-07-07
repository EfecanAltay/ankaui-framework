export class ContextActionData {

  public ActionName : string;
  public FunctionName : string;
  public Input : unknown;

  /**
   *
   */
  constructor(actionName : string,callingFuncName : string, inputData? : unknown) {
      this.ActionName = actionName;
      this.FunctionName = callingFuncName;
      this.Input = inputData;
  }
}