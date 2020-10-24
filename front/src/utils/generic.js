export const splitArrayBy = (array, condition) =>
  array.reduce((acc, element) => {
    const isFirst = condition(element)

    if (isFirst) {
      return [
        [...acc[0], element],
        acc[1]
      ]
    }

    return [
      acc[0],
      [...acc[1], element]
    ]
  }, [[], []])