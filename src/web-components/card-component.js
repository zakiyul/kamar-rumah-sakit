class CardComponent extends HTMLElement {
    set konten(konten){
        this._konten = konten;
        this.render();
    }

    render(){
        this.innerHTML = `
            <div className="card">
                <div className="card-header">
                    Ketersediaan Kamar
                </div>
                <div className="card-body">
                    <h5 className="card-title">${this._konten.name}</h5>
                    <p className="card-text">${this._konten.address}</p>
                    <div href="#" className="bg-primary">${this._konten.bed_availability}</div>
                </div>
            </div>  
        `
    }
}

customElements.define("card-component", CardComponent)