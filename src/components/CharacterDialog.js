import React, { useState } from "react";

import { Dialog, Attribute, ArrayData } from "./common";

const CharacterDialog = ({ character, open, onClose }) => {

  const [data] = useState(character);

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        title={data?.name}
        titleStyle={{
          paddingBottom: 16,
          borderBottom: `1px solid ${"#5a5a5a"}`,
        }}
      >
        <div>
          <Attribute field="Birth Year" value={data?.birth_year} />
          <Attribute field="Height" value={`${data?.height}${data?.height !== "unknown" ? "m" : ""}`} />
          <Attribute field="Mass" value={`${data?.mass}${data?.mass !== "unknown" ? "kg" : ""}`} />
          <Attribute field="Gender" value={data?.gender} />
          <Attribute field="Eye Color" value={data?.eye_color} />
          <Attribute field="Hair Color" value={data?.hair_color} />
          <Attribute field="Skin Color" value={data?.skin_color} />
          <ArrayData arrayName="films" field="title" data={data} />
          <ArrayData arrayName="starships" field="name" data={data} />
        </div>
      </Dialog>
    </>
  );
};

export default CharacterDialog;
