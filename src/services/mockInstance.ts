import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const baseURL = `${process.env.API_URL ?? 'https://patchwork.online'}/`;

const mockInstance = axios.create({
	baseURL,
});

export const mockServer = new MockAdapter(mockInstance, {
	delayResponse: 1000,
});

mockServer.onGet('/my-channel').reply(200, [
	{
		id: 1,
		name: 'Science',
		is_private: false,
		slug: 'science.channel.org',
		image_updated_at: '2024-09-05T10:31:48.115+00:00',
		description: 'Science Channel.',
		image_url:
			'https://s3-eu-west-2.amazonaws.com/newsmast/cache/media_attachments/files/113/086/195/193/340/011/original/f2ab535980ee7bce.png',
		created_at: '2024-09-05T10:31:48.116+00:00',
		updated_at: '2024-09-05T10:31:48.116+00:00',
	},
	{
		id: 2,
		name: 'Technology',
		is_private: false,
		slug: 'technology.channel.org',
		image_updated_at: '2024-09-05T10:31:48.115+00:00',
		description: 'Technology Channel.',
		image_url:
			'https://newsmast-assets.s3.eu-west-2.amazonaws.com/my_server_newsmast_cover_photos/newsmast_community_profile_photo.png',
		created_at: '2024-09-05T10:31:48.116+00:00',
		updated_at: '2024-09-05T10:31:48.116+00:00',
	},
]);

export default mockInstance;
