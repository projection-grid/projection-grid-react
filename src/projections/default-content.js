import DefaultContent from '../components/default-content';

function wrap(model) {
  const { content } = model;

  return content && content.Component ? model : {
    ...model,
    content: DefaultContent,
  };
}

export default function ({
  composeCaption,
  composeTds,
}) {
  return {
    composeCaption(caption) {
      return wrap(composeCaption(caption));
    },
    composeTds(td) {
      return composeTds(td).map(wrap);
    },
  };
}
