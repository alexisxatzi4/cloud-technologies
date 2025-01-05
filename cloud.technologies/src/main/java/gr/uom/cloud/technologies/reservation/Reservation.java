package gr.uom.cloud.technologies.reservation;

import java.time.LocalDate;

public class Reservation {
    private String citizen;
    private String car;
    private LocalDate reservationDate;
    private int reservationTime;

    public Reservation() {

    }

    public Reservation(String citizen, String car, LocalDate reservationDate, int reservationTime) {
        this.citizen = citizen;
        this.car = car;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
    }

    public String getCitizen() {
        return citizen;
    }

    public void setCitizen(String citizen) {
        this.citizen = citizen;
    }

    public String getCar() {
        return car;
    }

    public void setCar(String car) {
        this.car = car;
    }

    public LocalDate getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDate reservationDate) {
        this.reservationDate = reservationDate;
    }

    public int getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(int reservationTime) {
        this.reservationTime = reservationTime;
    }
}
