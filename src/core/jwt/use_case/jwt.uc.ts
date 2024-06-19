export abstract class IjwtUC {
  abstract sign(token: any);

  abstract verify(token: any);
}
