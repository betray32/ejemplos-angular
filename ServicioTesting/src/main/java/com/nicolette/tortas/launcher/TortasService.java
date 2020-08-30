package com.nicolette.tortas.launcher;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Servicio TortasService
 *
 * @author yharnam
 */
@RestController
public class TortasService {

    @GetMapping("/ObtenerTortas")
    public List<TortaBean> obtenerTodas() {

        System.out.println("Solicitud ingresada!");

        List<TortaBean> lista = new ArrayList<>();

        TortaBean dummy = new TortaBean();
        dummy.setId(11);
        dummy.setName("Torta Tres Leches");
        dummy.setDescription("Tres Delicias");

        TortaBean dummy1 = new TortaBean();
        dummy1.setId(12);
        dummy1.setName("Mil Horas de Amor");
        dummy1.setDescription("Mil Hojas Veg");

        lista.add(dummy1);
        lista.add(dummy);

        return lista;

    }

}
