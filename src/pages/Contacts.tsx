import { FC } from 'react'
import { Image } from '@nextui-org/react'

import style from '../App.module.scss'
import cn from 'classnames'

const Contacts: FC = () => {
  return (
    <>
      <h2 className={cn(style.infoTitle)}>Contacts</h2>

      <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt doloremque eum fugit hic laborum libero pariatur praesentium reprehenderit sed sit, tempore ullam, ut voluptate! Ad atque excepturi iste mollitia sequi!</span><span>Debitis distinctio ducimus eligendi nulla voluptatibus? Inventore mollitia nobis tempora. Consequuntur corporis cum error fugit ipsum nisi odio provident, reiciendis, suscipit ut veritatis, voluptatum. Dolore illum ipsam laborum quo soluta.</span><span>Dolorum error laudantium libero porro praesentium quas quia! Aperiam corporis cum distinctio dolorem et eveniet in laborum modi nemo, totam! Asperiores at autem ducimus exercitationem, explicabo nam provident quas quia.</span><span>Adipisci amet deserunt et maiores porro praesentium provident quas quis rerum voluptatum. Fuga maiores nemo nobis omnis quisquam quod recusandae rem. Dolore facilis, hic minima necessitatibus nemo quia saepe sed.</span></p>

      <Image
        width={300}
        alt="NextUI hero Image"
        src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      />
    </>
  )
}

export default Contacts
