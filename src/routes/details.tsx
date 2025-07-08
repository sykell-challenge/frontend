import { createFileRoute } from '@tanstack/react-router'
import Details from '../pages/details'

export const Route = createFileRoute('/details')({
  component: Details,
})
