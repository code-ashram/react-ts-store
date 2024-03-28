import maestroLogo from './images/maestro.svg'
import mastercardLogo from './images/mastercard.svg'
import mirLogo from './images/mir.svg'
import paypalLogo from './images/paypal.svg'
import visaLogo from './images/visa.svg'

type CardSystemLogo = {
  id: number
  src: string
  alt: string
}

const CardSystemImages: CardSystemLogo[] = [
  {
    id: 1,
    src: visaLogo,
    alt: 'Visa Logo'
  },
  {
    id: 2,
    src: mastercardLogo,
    alt: 'Mastercard Logo'
  },
  {
    id: 3,
    src: maestroLogo,
    alt: 'Maestro Logo'
  },
  {
    id: 4,
    src: mirLogo,
    alt: 'Mir Logo'
  },
  {
    id: 5,
    src: paypalLogo,
    alt: 'PayPal Logo'
  },
]

export default CardSystemImages
