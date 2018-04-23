import React from 'react'
import PropTypes from 'prop-types'
import { needsUnicodeFont } from '../util/unicode'
import { t } from '../app/locale'

const MAX_STREET_NAME_WIDTH = 50

export default class StreetName extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    childRef: PropTypes.func,
    onClick: PropTypes.func,
    editable: PropTypes.bool
  }

  static defaultProps = {
    name: '',
    editable: false
  }

  /**
   * Some processing needed to display street name
   *
   * @public for main street name ¯\_(ツ)_/¯
   * @params {string} name - Street name to check
   */
  static normalizeStreetName (name) {
    if (!name) return ''

    name = name.trim()

    if (name.length > MAX_STREET_NAME_WIDTH) {
      name = name.substr(0, MAX_STREET_NAME_WIDTH) + '…'
    }

    return name
  }

  constructor (props) {
    super(props)

    this.state = {
      isHovered: false
    }
  }

  onMouseEnter = () => {
    this.setState({ isHovered: true })
  }

  onMouseLeave = () => {
    this.setState({ isHovered: false })
  }

  renderHoverPrompt = () => {
    if (this.props.editable && this.state.isHovered) {
      return (
        <div className="street-name-hover-prompt">
          {t('street.rename', 'Click to rename')}
        </div>
      )
    }

    return null
  }

  render () {
    let classString = 'street-name-text ' + (!needsUnicodeFont(this.props.name) ? '' : 'fallback-unicode-font')
    const streetName = StreetName.normalizeStreetName(this.props.name) || t('street.default-name', 'Unnamed St')

    return (
      <div
        className="street-name"
        ref={this.props.childRef}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.props.onClick}
        id={this.props.id}
      >
        {this.renderHoverPrompt()}
        <div className={classString}>{streetName}</div>
      </div>
    )
  }
}
