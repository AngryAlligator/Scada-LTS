const storeEvents = {
	state: {},

	mutations: {},

	actions: {
		searchEvents({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/search`,
				data: {
					alarmLevel: payload.alarmLevel,
					eventSourceType: payload.eventSourceType,
					status: payload.status,
					keywords: payload.keywords,
					datapoint: null,
					limit: payload.itemsPerPage,
					offset: payload.itemsPerPage * (payload.page - 1),
					sortBy: !payload.sortBy.length ? ['alarmLevel', 'activeTs'] : payload.sortBy,
					sortDesc: !payload.sortDesc.length ? [true, true] : payload.sortDesc,
					startDate: payload.startDate ? payload.startDate : '',
					endDate: payload.endDate ? payload.endDate : '',
					startTime: payload.startTime ? payload.startTime : '',
					endTime: payload.endTime ? payload.endTime : '',
				},
			});
		},

		getHighestUnsilencedAlarmLevel({ dispatch }) {
			return dispatch('requestGet', `/events/highestUnsilencedLevelAlarm`);
		},

		getEventById({ dispatch }, id) {
			return dispatch('requestGet', `/events/${id}/comments`);
		},

		fetchDataPointEvents({ dispatch }, payload) {
			let url = `/events/datapoint/${payload.datapointId}`;

			if (!!payload.limit) {
				url += `?limit=${payload.limit}`;
			}

			if (!!payload.offset && !!payload.limit) {
				url += '&';
			}

			if (!!payload.offset) {
				if (!payload.limit) {
					url += `?`;
				}
				url += `offset=${payload.offset}`;
			}

			return dispatch('requestGet', url);
		},
		acknowledgeEvent({ dispatch }, payload) {
			return dispatch('requestPut', {
				url: `/events/ack/${payload.eventId}`,
				data: payload,
			});
		},
		silenceEvent({ dispatch }, payload) {
			return dispatch('requestPut', {
				url: `/events/silence/${payload.eventId}`,
				data: payload,
			});
		},
		unsilenceEvent({ dispatch }, payload) {
			return dispatch('requestPut', {
				url: `/events/unsilence/${payload.eventId}`,
				data: payload,
			});
		},

		acknowledgeSelectedEvents({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/ackSelected`,
				data: payload,
			});
		},
		silenceSelectedEvents({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/silenceSelected`,
				data: payload,
			});
		},
		unsilenceSelectedEvents({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/unsilenceSelected`,
				data: payload,
			});
		},

		acknowledgeAll({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/ackAll`,
				data: {},
			});
		},
		silenceAll({ dispatch }, payload) {
			return dispatch('requestPost', {
				url: `/events/silenceAll`,
				data: {},
			});
		},
		publishEventComment({ dispatch }, payload) {
			return dispatch('requestPut', {
				url: `/events/${payload.eventId}/comments`,
				data: payload,
			});
		},

		ackEvent({ dispatch }, eventId) {
			return dispatch('requestPut', {
				url: `/events/ack/${eventId}`,
				data: null,
			});
		},
	},

	getters: {},
};

export default storeEvents;
