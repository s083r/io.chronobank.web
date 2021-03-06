import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class PartnerModel {
  constructor ({ id, title, url, icon, icon2x, brief }) {
    this.id = id
    this.title = title
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    assert(icon2x == null || icon2x instanceof ImageModel)
    this.icon2x = icon2x
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? data : new PartnerModel({
      ...data,
      icon: ImageModel.fromJS(data.icon),
      icon2x: ImageModel.fromJS(data.icon2x),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? data : new PartnerModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: data.title,
      url: data.url,
      brief: localeModelFields.getLocaleField('brief'),
      icon: data.icon
        ? ImageModel.fromServerModel(data.icon)
        : null,
      icon2x: data.icon2x
        ? ImageModel.fromServerModel(data.icon2x)
        : null,
    })
  }
}
