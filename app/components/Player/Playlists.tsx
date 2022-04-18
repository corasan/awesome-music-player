import { Link } from '@remix-run/react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const Playlists = () => {
  const { musicKit } = useStore()
  return (
    <>
      {musicKit.playlists?.map(p => (
        <PlaylistItem key={p.id} item={p} />
      ))}
    </>
  )
}

const PlaylistItem = ({ item }: PlaylistItemProps) => {
  return <Link to={item.id}>{item.attributes.name}</Link>
}

type PlaylistItemProps = {
  item: MusicKit.Resource & { id: string }
}

export default observer(Playlists)
