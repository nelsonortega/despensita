import Strings from './DespensitaStrings.json'

export class I18N {
  private static instance: I18N = new I18N()
  private providerI18N: Object = Strings

  static get(key: string) {
    return I18N.instance.providerI18N[key] || key
  }
}