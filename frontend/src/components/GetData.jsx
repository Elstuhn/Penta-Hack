import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

function GetData() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
  })
}