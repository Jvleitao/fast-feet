import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fails');
    }

    if (!req.userId) {
      return res.status(401).json('Unverified user');
    }

    const { id, name, street } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
    });
  }
}

export default new RecipientController();
