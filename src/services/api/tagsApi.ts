import axios from 'axios'
import { TagsState } from '../../store/ducks/theme/contracts/state'

export const TagsApi = {
    fetchTags(): Promise<TagsState['items']>{
        return axios.get('/tags' ).then(({data}) => data)
    }
}