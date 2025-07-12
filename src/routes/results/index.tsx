
import { createFileRoute } from '@tanstack/react-router'
import Results from '../../parts/pages/results'

export const Route = createFileRoute('/results/')({
  component: Results,
})
