import { FC } from 'react'
import { FormattedMessage } from 'react-intl/lib'
import { Image } from '@nextui-org/react'
import cn from 'classnames'

import CardSystemImages from './assets/CardSystemImages.ts'

import style from '../../App.module.scss'

const DeliveryAndPayment: FC = () => {
  return (
    <>
      <h2 className={cn(style.infoTitle)}>
        <FormattedMessage id={'navBar.link.delivery'} />
      </h2>

      <p className={cn(style.aboutText)}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloremque
        eum fugit hic laborum libero pariatur praesentium reprehenderit sed sit, tempore ullam, ut voluptate! Ad atque
        excepturi iste mollitia sequi! Debitis distinctio ducimus eligendi nulla voluptatibus? Inventore mollitia nobis
        tempora. Consequuntur corporis cum error fugit ipsum nisi odio provident, reiciendis, suscipit ut veritatis,
        voluptatum. Dolore illum ipsam laborum quo soluta. Dolorum error laudantium libero porro praesentium quas quia!
        Aperiam corporis cum distinctio dolorem et eveniet in laborum modi nemo, totam! Asperiores at autem ducimus
        exercitationem, explicabo nam provident quas quia. Adipisci amet deserunt et maiores porro praesentium provident
        quas quis rerum voluptatum. Fuga maiores nemo nobis omnis quisquam quod recusandae rem. Dolore facilis, hic
        minima necessitatibus nemo quia saepe sed.
      </p>

      <h3 className={cn(style.infoSubtitle, 'text-center', 'text-xl')}>
        <FormattedMessage id={'delivery.cards'} />
      </h3>

      <div className={cn(style.cardSystemImg, 'flex', 'justify-center')}>
        {CardSystemImages.map((img) =>
          <Image
            key={img.id}
            alt={img.alt}
            src={img.src}
            width={100}
          />
        )}
      </div>
    </>
  )
}

export default DeliveryAndPayment
