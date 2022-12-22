import fields from '../definitions/index.js';

/*
 Follows jsonapi syntax for query params
 */
export default (table, queryParams) => {
  let query = 'SELECT * FROM ??';
  const params = [table];
  const filterList = {};
  const filterStrings = [];
  
  if (queryParams.filter) {

    Object.entries(queryParams.filter).forEach(([filterkey, filtervalue]) => {
      if (fields[table][filterkey] || filterkey === 'uuid') {
        filterList[filterkey] = {
          key: filterkey,
          value: filtervalue,
          operator: queryParams.filteroperator ? queryParams.filteroperator[filterkey] : null,
        };
      }
    });

    if (Object.keys(filterList).length > 0) {
      query += ' WHERE ';
    }

    Object.entries(filterList).forEach(([, filter]) => {
      params.push(filter.key);

      if (filter.operator === 'like') {
        filterStrings.push('?? LIKE ?');
        params.push(`%${filter.value}%`);
      } else if (filter.operator === 'in') {
        filterStrings.push('?? IN (?)');
        params.push(filter.value.split(','));
      } else if (filter.operator === 'nullable') {
        filterStrings.push('(?? = ? OR ?? IS NULL)');
        params.push(filter.value.split(','));
        params.push(filter.key);
      } else if (filter.operator === 'any') {
        const anyFilterStrings = [];
        anyFilterStrings.push('( ');
        filter.value.split(',').forEach((value, index) => {
          if (index > 0) {
            anyFilterStrings.push(' OR ');
            params.push(filter.key);
          }

          anyFilterStrings.push('?? LIKE ?');
          params.push(`%${value}%`);
        });

        anyFilterStrings.push(' )');
        filterStrings.push(anyFilterStrings.join(''));
      } else {
        filterStrings.push('?? = ?');
        params.push(filter.value);
      }
      
    });

    query += filterStrings.join(' AND ');
  }

  if (queryParams.orderby) {
    query += ' ORDER BY';
    const orders = queryParams.orderby.split(',');
    orders.forEach((order, index) => {
      query += ' ??';
      if (order.indexOf('-') === 0) {
        params.push(order.substr(1, order.length - 1));
        query += ' DESC';
      } else {
        params.push(order);
      }
      if (orders[index + 1]) {
        query += ',';
      }
    });
  }

  if (queryParams.limit) {
    query += ' LIMIT ?';
    params.push(queryParams.limit);
  }

  return [query, params];
};
