const BaseInfo = () => {
  return (
    <div className="baseinfo">
      <form>
        <header>Sign Up</header>
        <div>
          <div className="form_input_group">
            <label htmlFor="">First name</label>
            <input type="text" name="BPSLNAME" />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Last name</label>
            <input type="text" name="BPSFNAME" />
          </div>
        </div>
        <div>
          <div className="form_input_group">
            <label htmlFor="">Identifier</label>
            <input type="text" name="BPSNUM" />
          </div>
          <div className="form_input_group">
            <label htmlFor="">Raison sociale</label>
            <input type="text" name="BPSNAM" />
          </div>
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse de facturation</label>
          <input type="text" name="BPAINV" />
        </div>
        <div className="form_input_group">
          <label htmlFor="">Adresse par défaut</label>
          <input type="text" name="BPAADD" />
        </div>
        <button>Next</button>
      </form>
    </div>
  );
};

export default BaseInfo;
