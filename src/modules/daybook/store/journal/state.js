// Objeto reactivo., cuando cambie el state se va a notificar a tofos los componentes que este escuchando.
// Es el lugar donde se esta almacenando la información

export default () => ({
    isLoading: true,
    entries: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text:'Aute laboris est officia enim commodo aliquip commodo incididunt anim fugiat nostrud veniam aute excepteur. Qui do voluptate ipsum eu esse mollit. Esse excepteur elit eiusmod magna aliqua dolore ipsum magna consectetur quis mollit. Exercitation veniam mollit tempor culpa cillum qui dolor aliqua pariatur minim officia. Enim pariatur anim reprehenderit esse excepteur aliqua aliquip ad et non anim labore et.',
            picture: null,
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text:'Reprehenderit dolor sunt ea adipisicing sunt ad nulla nostrud Lorem eu eiusmod officia. Nulla Lorem veniam amet in culpa nisi magna consequat Lorem consequat et. Nostrud consequat eiusmod esse ex veniam culpa ex ad ex enim esse nulla. Ea ex laborum minim sunt exercitation officia tempor. Laborum cillum aute duis ut exercitation reprehenderit aute reprehenderit.',
            picture: null,
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text:'Nisi dolor in ex ad magna amet qui qui est velit proident. Enim dolore dolore do mollit cupidatat id. Amet ipsum irure duis magna laborum nostrud. Est proident minim laboris magna deserunt aute cupidatat velit occaecat excepteur ullamco consequat et proident. Anim magna aute eu fugiat. Est Lorem quis ea esse in. Do occaecat do cupidatat ex officia dolor cillum dolore consequat.',
            picture: null,
        },
    ]
})