class Github {
    constuctor(){
        this.client_id = '186a13c8cd8f0cc5d741';
        this.client_secret = '08f5eced68eb67b3a135837a2d4ede4ac938314f';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();

        return {
            profile
        }
    }
}