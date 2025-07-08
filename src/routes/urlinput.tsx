import { createFileRoute } from '@tanstack/react-router'
import UrlInput from '../pages/urlinput'

export const Route = createFileRoute('/urlinput')({
  component: UrlInput,
})
