import axios from 'axios'
export default ({
    state: {
        cities: [
            {
                id: 1,
                name: 'Москва'
            },
            {
                id: 2,
                name: 'Санкт-Петербург'
            },
            {
                id: 3,
                name: 'Казань'
            }
        ],
        date: [],
        city_id: null,
        errorRequest: []
    },
    getters: {
        allCities(state) {
            return state.cities
        },
        serverResponse(state) {
            return state.errorRequest
        }
    },
    mutations: {
        dateSubmit(state, newDate) {
            state.date.push(newDate)
            for (let i = 0; i < state.cities.length; i++) {
                if (state.cities[i].name === state.date[0].cityName) {
                    state.city_id = state.cities[i].id
                }
            }
        },
    },
    actions: {
        sendDate(context) {
            axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/',
                {
                    name: context.state.date[0].fullName,
                    phone: context.state.date[0].phone,
                    email: context.state.date[0].email,
                    city_id: context.state.city_id,
            })
                .then(function (response) {
                    //console.log(response);
                    for ( let i = 0; context.state.errorRequest.length > i; i++) {
                        context.state.errorRequest.pop()
                    }
                    if (response.status === 200) {
                            context.state.errorRequest.push({
                                errorNumber: response.status,
                                statusSend: 'Заявка принята. Ожидайте звонка нашего специалиста.',
                            });
                        }
                })
                .catch(function (error) {
                    for ( let i = 0; context.state.errorRequest.length > i; i++) {
                        context.state.errorRequest.pop()
                    }
                    //console.log(error);
                    if (error.request.status === 400) {
                        context.state.errorRequest.push({
                            errorNumber: error.request.status,
                            statusSend: 'Введенные Вами данные не корректны. Проверье данные и повторите попытку',
                        });
                    }
                });
            //console.log(context.state.errorRequest)
        }
    }
})