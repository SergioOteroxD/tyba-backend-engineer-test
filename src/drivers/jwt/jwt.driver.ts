export abstract class IjwtDriver {
  abstract sign(token: any);

  abstract verify(token: any);
}
