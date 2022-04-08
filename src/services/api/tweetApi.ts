import { Tweet, TweetsState } from '../../store/ducks/tweets/contracts/state'
import {istance} from '../../core/axios'

interface Response<T> {
    status: 'success' | 'error',
    data: T | any,
    userComment: any
}


export const TweetsApi = {

    async fetchTweets(id?: string): Promise<Tweet[]> {
        const { data } = await istance.get<Response<Tweet[]>>(!!id ? `/tweet/user/${id}` : 'tweets')
        return data.data
    },

    async fetchTweet(id: string): Promise<Tweet> {
        const { data } = await istance.get<Response<Tweet>>('/tweet/' + id)
        const obj = await Object.assign({}, data.data, data.userComment)
        return data.data
    },

    async AddTweet(payload ): Promise<Tweet> {
        const { data } = await istance.post('/tweets/', payload)
        return data.data
    }, 

    async deleteTweet(id: string): Promise<Tweet> {
        const { data } = await istance.delete(`/tweet/${id}`)
        return data.data
    }, 

    async likeToggleTweet(payload): Promise<Tweet> {
        const { data } = await istance.patch(`/tweet/like/${payload.id}`, {userId: payload.userID} )
        return data
    }, 
  
    async AddCommnet(payload) {
        const { data } = await istance.post(`/tweet/comment/${payload.tweetID}`, {userId: payload.userID, text: payload.text, images: payload.photo, fullname: payload.author.fullname, username: payload.author.username})
        return data
    }, 
    async bookmarksToggleTweet(payload) {
        const { data } = await istance.put(`users/bookmarks/${payload.userID}`, {tweetID: payload.tweetID})
        return data
    }, 
}